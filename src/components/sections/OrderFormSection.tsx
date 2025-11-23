'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/lib/data';

interface OrderFormSectionProps {
  title: string;
  dictionary: any;
  lang: 'en' | 'ar';
  products: (Omit<Product, 'name' | 'description' | 'longDescription'> & { name: string, description: string, longDescription: string })[];
}

const OrderFormSection: React.FC<OrderFormSectionProps> = ({ title, dictionary, lang, products }) => {
  const { toast } = useToast();
  // IMPORTANT: Replace with your actual WhatsApp number from an environment variable
  const WHATSAPP_NUMBER = '1234567890';

  const t = (key: string) => dictionary[key][lang];

  const countries = dictionary.countries[lang];

  const formSchema = z.object({
    name: z.string().min(2, { message: lang === 'ar' ? 'الاسم مطلوب' : 'Name is required' }),
    countryCode: z.string().min(1, { message: lang === 'ar' ? 'رمز الدولة مطلوب' : 'Country code is required' }),
    phone: z.string().min(7, { message: lang === 'ar' ? 'رقم هاتف صحيح مطلوب' : 'Valid phone number is required' }),
    product: z.string().min(1, { message: lang === 'ar' ? 'المنتج مطلوب' : 'Product is required' }),
    quantity: z.coerce.number().min(1, { message: lang === 'ar' ? 'الكمية يجب أن تكون 1 على الأقل' : 'Quantity must be at least 1' }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      countryCode: countries[0].code,
      phone: '',
      product: '',
      quantity: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedProduct = products.find(p => p.id === values.product);
    if (!selectedProduct) return;
    
    const message = `
      New Order from Elegance Boutique:
      ---------------------------------
      Name: ${values.name}
      Phone: ${values.countryCode}${values.phone}
      Country: ${countries.find((c:any) => c.code === values.countryCode)?.name}
      Product: ${selectedProduct.name} (ID: ${values.product})
      Quantity: ${values.quantity}
      ---------------------------------
    `.replace(/\s+/g, ' ').trim().replace(/ /g, '%20');

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    toast({
      title: t('formSuccess'),
    });

    window.open(whatsappUrl, '_blank');
    form.reset();
  };

  return (
    <section id="order" className="bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center font-headline text-3xl md:text-4xl font-bold text-primary">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('formName')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('formNamePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem>
                  <FormLabel>{t('formPhone')}</FormLabel>
                  <div className="flex gap-2">
                     <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger className="w-[140px]">
                                    <SelectValue placeholder={t('formCountryPlaceholder')} />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                {countries.map((country: {code: string, name: string}) => (
                                    <SelectItem key={country.code} value={country.code}>
                                    {country.name} ({country.code})
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        )}
                        />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                          <FormControl>
                            <Input type="tel" placeholder={t('formPhonePlaceholder')} {...field} />
                          </FormControl>
                      )}
                    />
                  </div>
                   <FormMessage>{form.formState.errors.phone?.message || form.formState.errors.countryCode?.message}</FormMessage>
                </FormItem>

                <FormField
                  control={form.control}
                  name="product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('formProduct')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('formProductPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('formQuantity')}</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" placeholder={t('formQuantityPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full text-lg py-6" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? t('formSubmitting') : t('formSubmit')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default OrderFormSection;
