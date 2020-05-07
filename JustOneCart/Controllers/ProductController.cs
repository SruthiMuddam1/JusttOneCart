using System;
using System.Linq;
using System.Web.Http;
using JustOneCart.Models;

namespace CRUDAPI.Controllers
{
    [RoutePrefix("Api/Product")]
    public class ProductAPIController : ApiController
    {
        JustOneCartEntities1 objEntity = new JustOneCartEntities1();

        [HttpGet]
        [Route("AllProducts")]
        public IQueryable<Product> GetProducts()
        {
            try
            {
                return objEntity.Products;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        [Route("GetProductDetailsById/{ProductId}")]
        public IHttpActionResult GetEmaployeeById(int productId)
        {
            Product objProd = new Product();
            int ID = Convert.ToInt32(productId);
            try
            {
                objProd = objEntity.Products.Find(ID);
                if (objProd == null)
                {
                    return NotFound();
                }

            }
            catch (Exception)
            {
                throw;
            }

            return Ok(objProd);
        }

        [HttpPost]
        [Route("InsertProductDetails")]
        public IHttpActionResult PostProduct(Product data)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.Products.Add(data);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(data);
        }

        [HttpPost]
        [Route("InsertOrderDetails")]
        public IHttpActionResult PostOrder(ProductOrder productOrder)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                objEntity.ProductOrders.Add(productOrder);
                objEntity.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }



            return Ok(productOrder);    
        }


        [HttpPut]
        [Route("UpdateProductDetails")]
        public IHttpActionResult PutEmaployeeMaster(Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                Product objProd = new Product();
                objProd = objEntity.Products.Find(product.ID);
                if (objProd != null)
                {
                    //objProd.EmpName = employee.EmpName;
                    //objEmp.Address = employee.Address;
                    //objEmp.EmailId = employee.EmailId;
                    //objEmp.DateOfBirth = employee.DateOfBirth;
                    //objEmp.Gender = employee.Gender;
                    //objEmp.PinCode = employee.PinCode;

                }
                int i = this.objEntity.SaveChanges();

            }
            catch (Exception)
            {
                throw;
            }
            return Ok(product);
        }
        [HttpDelete]
        [Route("DeleteProductDetails")]
        public IHttpActionResult DeleteEmaployeeDelete(int id)
        {
            //int empId = Convert.ToInt32(id);  
            Product product = objEntity.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            objEntity.Products.Remove(product);
            objEntity.SaveChanges();

            return Ok(product);
        }
    }
}