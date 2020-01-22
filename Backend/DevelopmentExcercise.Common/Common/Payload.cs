using System;

namespace Common
{
	public class Payload<T>
	{
		public string Message { get; set; }
		public T Data { get; set; }
		public int Code { get; set; }

		public Payload()
		{
			Message = "Succefull Operation";
			Code = 200;
		}
	}
}
