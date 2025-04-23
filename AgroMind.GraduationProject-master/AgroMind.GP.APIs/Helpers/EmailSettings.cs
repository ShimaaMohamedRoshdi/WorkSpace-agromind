using System.Net.Mail;
using System.Net;
using AgroMind.GP.Core.Entities;
using Company.Session3MVC.DAL.Data.Configuration;

namespace AgroMind.GP.APIs.Helpers
{
	public static class EmailSettings
	{
		public static void SendEmail(IConfiguration configuration, Email email)
		{
			var emailConfig = new EmailConfiguration();
			configuration.GetSection("EmailSettings").Bind(emailConfig);

			using var client = new SmtpClient(emailConfig.SmtpServer, emailConfig.Port)
			{
				EnableSsl = true,
				Credentials = new NetworkCredential(emailConfig.SenderEmail, emailConfig.SenderPassword)
			};

			// Send the email
			client.Send(emailConfig.SenderEmail, email.To, email.Subject, email.Body);
		}
	}
}
