using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DevelopmentExcercise.Common
{

    public class ServiceResponse
    {
        public bool Success { get; set; }
        public string UserMessage { get; set; }
        public string MessageType { get; set; }
        public string SystemErrorMessage { get; set; }
        public List<string> ValidationErrors { get; set; }

        public ServiceResponse()
        {
            Success = true;
            UserMessage = "Success Operation";
            MessageType = "success";
            ValidationErrors = new List<string>();
        }
    }

    public class ServiceEntityNotFound : ServiceResponse
    {
        public ServiceEntityNotFound()
        {
            Success = false;
            UserMessage = "Entity not found";
        }
    }

    public class ServiceEntityDuplicated : ServiceResponse
    {
        public ServiceEntityDuplicated(string entityName)
        {
            Success = false;
            MessageType = "Error";
            UserMessage = "The " + entityName + " is duplicated";
        }
    }

    public class ServiceEntityErrorForeignKey : ServiceResponse
    {
        public ServiceEntityErrorForeignKey(string entityName)
        {
            Success = false;
            UserMessage = "The " + entityName + " has a foreign key dependency";
        }
    }

    public class ServiceOperationFailed : ServiceResponse
    {
        string EntityName { get; set; }
        string OperationName { get; set; }
        DateTime OperationFailedDate { get; set; }
        string InnerException { get; }
        private string Layer { get; }
        private int LineNumber { get; set; }
        public ServiceOperationFailed()
        {

        }

        public ServiceOperationFailed(string userMessage)
        {
            UserMessage = userMessage;
        }

        public ServiceOperationFailed(string userMessage, Exception exception, string serviceName = "", string operationName = "")
        {
            OperationFailedDate = DateTime.Now;
            Success = false;
            MessageType = "danger";
            UserMessage = userMessage;
            EntityName = serviceName;
            OperationName = operationName;
            SystemErrorMessage = exception.Message;
            Layer = "service";
            if (exception.InnerException != null)
                InnerException = exception.InnerException.Message;
        }
    }

    public class ServiceException : Exception
    {
        public ServiceException(string userMessage) : base(userMessage)
        {

        }
    }
}
