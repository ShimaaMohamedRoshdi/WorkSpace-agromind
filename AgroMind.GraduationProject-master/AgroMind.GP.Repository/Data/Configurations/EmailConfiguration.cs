namespace Company.Session3MVC.DAL.Data.Configuration
{
	public class EmailConfiguration
	{
		public string SmtpServer { get; set; }
		public int Port { get; set; }
		public string SenderEmail { get; set; }
		public string SenderPassword { get; set; }
	}

}
