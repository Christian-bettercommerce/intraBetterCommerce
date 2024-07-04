import type { APIRoute } from 'astro';
import * as XLSX from 'xlsx';
import * as brevo from '@getbrevo/brevo';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const data = body.filter((e : any) => e['SKU '] !== undefined && e['SKU '] !== null && e['ID'] !== undefined && e['ID'] !== null).map((e : any) => e);
  const product_big = await Promise.all(data.map(async (element : any) => {
    const percentage_discount =((((element['PRECIO OFERTA']) - (element['PRECIO CAMPANA'] )) * 100) / (element['PRECIO OFERTA'] ))
    if(percentage_discount > (element['PORCENTAJE MAX DSCTO'] * 100)){
      return {...element, message : "Producto excede el porcentaje maximo de descuento"}
    }
    const data = await getProduct(element['ID'])
    const product = data.variants.find((variant: any) => variant.sku == element['SKU '])

    if(!product){
      return {...element, message : "No se encontro informacion del producto"}
    }

    if(parseInt(product.price) != (element['PRECIO NORMAL ACTUAL BC']) || parseInt(product.sale_price) != (element['PRECIO OFERTA ACTUAL BC'])){
      return {...element, "PRECIO BIGCOMMERCE":product.price, "PRECIO VENTA BIGCOMMERCE": product.sale_price, message : "Diferencia en los precios actuales con bigcommerce"}
    }
    return
  }))
  const result = product_big.filter(element => element !== undefined && element !== null)
  console.log(result)
  if(result.length > 0){
    const { fileBuffer } = generateXLSXFile(result)
    //await sendEmail(fileBuffer)
    return new Response(JSON.stringify({status : false}));
  }
  return new Response(JSON.stringify({status : true}));
}

const getProduct = async (id : string) => {
  const store_hash = import.meta.env.PUBLIC_STORE_CL;
  const token = import.meta.env.PUBLIC_CL_UF;
  const url = `https://api.bigcommerce.com/stores/${store_hash}/v3/catalog/products/${id}?include=variants`;
  const response = await fetch(url, {
    method: 'GET',
    headers:{
      'X-Auth-Token': token
    }
  });
  const { data } = await response.json();

  return data
}

const generateXLSXFile = (data : any) => {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, worksheet)
  const fileBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  return { fileBuffer };
}

const sendEmail = (fileBuffer:any) => {
  let apiInstance = new brevo.TransactionalEmailsApi();

  apiInstance.setApiKey(0,import.meta.env.BREVO_API_KEY)

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.subject = "WARNING !!! VALIDADOR DE PRECIOS";
  sendSmtpEmail.htmlContent = "<html><body><h1>ARCHIVO ADJUNTO</h1></body></html>";
  sendSmtpEmail.sender = { "name": "Validador ", "email": "intranet@no-reply.cl" };
  sendSmtpEmail.to = [
    { "email": "dpinto@bettercommerce.cl" },
    { "email": "christian.quiroz@bettercommerce.cl" }
  ];
  //sendSmtpEmail.replyTo = { "email": "christian.quiroz@bettercommerce.cl" };
  //sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  //sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  sendSmtpEmail.attachment = [
    {
      name: 'warning-price.xlsx',
      content: fileBuffer.toString('base64')
    },
  ];
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });

}