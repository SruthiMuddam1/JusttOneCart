//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace JustOneCart.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductDailyRequest
    {
        public int RequestId { get; set; }
        public Nullable<int> ProductId { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string MemberName { get; set; }
        public Nullable<int> MemberId { get; set; }
    
        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
