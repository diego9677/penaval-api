import { PrismaClient } from "@prisma/client";
import { encryptPassword } from "../src/helpers/auth";
import axios from "axios";

const prisma = new PrismaClient();
const headers = {
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZGxoZGVnZm94bHpweXp1dGNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MDc3MzY5OSwiZXhwIjoxOTc2MzQ5Njk5fQ.qJcT3_6C9oLsxVPt3EzAr_ZgKHemo30AHvs1u4Px7Jo',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZGxoZGVnZm94bHpweXp1dGNrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2MDc3MzY5OSwiZXhwIjoxOTc2MzQ5Njk5fQ.qJcT3_6C9oLsxVPt3EzAr_ZgKHemo30AHvs1u4Px7Jo'
};

async function getBrands() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/brands?select=*', { headers });
  return response.data;
}

async function getClients() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/clients?select=*', { headers });
  return response.data;
}

async function getPlaces() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/places?select=*', { headers });
  return response.data;
}

async function getProducts() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/products?select=*', { headers });
  return response.data;
}

async function getProformas() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/proforma?select=*', { headers });
  return response.data;
}

async function getProformasDetail() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/proforma_detail?select=*', { headers });
  return response.data;
}

async function getProviders() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/providers?select=*', { headers });
  return response.data;
}

async function getSales() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/sales?select=*', { headers });
  return response.data;
}

async function getSalesDetail() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/sale_detail?select=*', { headers });
  return response.data;
}

async function getShopping() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/shopping?select=*', { headers });
  return response.data;
}

async function getShoppingDetail() {
  const response = await axios.get('https://vsdlhdegfoxlzpyzutck.supabase.co/rest/v1/shopping_detail?select=*', { headers });
  return response.data;
}

async function main() {
  try {
    const userDb = await prisma.user.findFirst({ where: { username: 'Admin' } });
    if (!userDb) {
      const createdUserDb = await prisma.user.create({
        data: {
          username: 'Admin',
          password: await encryptPassword('Penaval123'),
          person: {
            create: {
              firstName: 'Penaval',
              lastName: 'Srl',
              phone: '73643689'
            }
          }
        }
      });
      console.log(`User=${createdUserDb.id} created`);
    }

    const brandsDb = await prisma.brand.findMany();
    if (!brandsDb.length) {
      const brands = await getBrands();
      const createdBrandsDb = await prisma.brand.createMany({
        data: brands
      });
      console.log(`${createdBrandsDb.count} brands created`);
    }

    const clientsDb = await prisma.client.findMany();
    if (!clientsDb.length) {
      let data: { id: number; nit: string; personId: number; }[] = [];
      const clients = await getClients();
      for (const client of clients) {
        const personDb = await prisma.person.create({
          data: {
            firstName: client.first_name,
            lastName: client.last_name,
            phone: client.phone
          }
        });
        data.push({ id: client.id, nit: client.nit, personId: personDb.id });
      }
      const createdClientsDb = await prisma.client.createMany({ data });
      console.log(`${createdClientsDb.count} clients created`);
    }

    const placesDb = await prisma.place.findMany();
    if (!placesDb.length) {
      const places = await getPlaces();
      const createdPlacesDb = await prisma.place.createMany({
        data: places
      });
      console.log(`${createdPlacesDb.count} places created`);
    }

    const productsDb = await prisma.product.findMany();
    if (!productsDb.length) {
      const products = await getProducts();
      const createdProductsDb = await prisma.product.createMany({
        data: products.map((p: any) => ({ id: p.id, code: p.code, price: p.price, placeId: p.place_id, brandId: p.brand_id, stock: p.stock, measures: p.measures }))
      });
      console.log(`${createdProductsDb.count} products created`);
    }

    const providersDb = await prisma.provider.findMany();
    if (!providersDb.length) {
      const providers = await getProviders();
      const createdProvidersDb = await prisma.provider.createMany({
        data: providers
      });
      console.log(`${createdProvidersDb.count} providers created`);
    }

    const proformasDb = await prisma.proforma.findMany();
    if (!proformasDb.length) {
      const userDb = await prisma.user.findUnique({ where: { username: 'Admin' } });
      if (!userDb) return;
      const proformas = await getProformas();
      const createdProformasDb = await prisma.proforma.createMany({
        data: proformas.map((p: any) => ({ id: p.id, userId: userDb.id, clientId: p.client_id, createdAt: new Date(p.created_at), updatedAt: new Date(p.created_at) }))
      });
      console.log(`${createdProformasDb.count} proformas created`);
    }

    const proformasDetailDb = await prisma.proformaDetail.findMany();
    if (!proformasDetailDb.length) {
      const proformasDetail = await getProformasDetail();
      const createdProformasDetailDb = await prisma.proformaDetail.createMany({
        data: proformasDetail.map((p: any) => ({ id: p.id, productId: p.product_id, proformaId: p.proforma_id, quantity: p.quantity, unitPrice: p.unit_price }))
      });
      console.log(`${createdProformasDetailDb.count} proformas detail created`);
    }

    const salesDb = await prisma.sale.findMany();
    if (!salesDb.length) {
      const sales = await getSales();
      const userDb = await prisma.user.findUnique({ where: { username: 'Admin' } });
      if (!userDb) return;
      const createdSalesDb = await prisma.sale.createMany({
        data: sales.map((s: any) => ({ id: s.id, userId: userDb.id, clientId: s.client_id, createdAt: new Date(s.created_at), updatedAt: new Date(s.created_at) }))
      });
      console.log(`${createdSalesDb.count} sales created`);
    }

    const salesDetailDb = await prisma.saleDetail.findMany();
    if (!salesDetailDb.length) {
      const salesDetail = await getSalesDetail();
      const createdSalesDetailDb = await prisma.saleDetail.createMany({
        data: salesDetail.map((s: any) => ({ id: s.id, productId: s.product_id, saleId: s.sale_id, quantity: s.quantity, salePrice: s.sale_price }))
      });
      console.log(`${createdSalesDetailDb.count} sales detail created`);
    }

    const shoppingDb = await prisma.shopping.findMany();
    if (!shoppingDb.length) {
      const shopping = await getShopping();
      const userDb = await prisma.user.findUnique({ where: { username: 'Admin' } });
      if (!userDb) return;
      const createdShoppingDb = await prisma.shopping.createMany({
        data: shopping.map((s: any) => ({ id: s.id, userId: userDb.id, providerId: s.provider_id, createdAt: new Date(s.created_at), updatedAt: new Date(s.created_at) }))
      });
      console.log(`${createdShoppingDb.count} shopping created`);
    }

    const shoppingDetailDb = await prisma.shoppingDetail.findMany();
    if (!shoppingDetailDb.length) {
      const shoppingDetail = await getShoppingDetail();
      const createdSalesDetailDb = await prisma.shoppingDetail.createMany({
        data: shoppingDetail.map((s: any) => ({ id: s.id, productId: s.product_id, shoppingId: s.shopping_id, quantity: s.quantity, salePrice: s.sale_price, pucharsePrice: s.pucharse_price }))
      });
      console.log(`${createdSalesDetailDb.count} shopping detail created`);
    }

    return 'Seeded successfully';
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(console.log)
  .catch(console.log);