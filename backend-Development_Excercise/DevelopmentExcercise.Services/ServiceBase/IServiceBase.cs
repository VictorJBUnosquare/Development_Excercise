using DevelopmentExcercise.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace DevelopmentExcercise.Services.ServiceBase
{
    public interface IServiceBase<T> where T : class
    {
        ServiceResponse Add(T entity);
        ServiceResponse Update(int id, T entity);
        ServiceResponse Delete(int id);
        T GetById(int id);
        T GetfFirst();
        IEnumerable<T> GetList();
    }
}
