using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Entities;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.ServiceHelpers
{
    public class EmailSettings{
        public string ServerAddress { get; set; }
        public int ServerPort { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
    }

    public class EmailHandler : IEmailHandler
    {
        private readonly string serverAddress;
        private readonly int serverPort;
        private readonly string username;
        private readonly string password;
        private readonly string email;
        public EmailHandler(EmailSettings emailSettings)
        {
            serverAddress = emailSettings.ServerAddress;
            serverPort = emailSettings.ServerPort;
            username = emailSettings.Username;
            password = emailSettings.Password;
            email = emailSettings.EmailAddress;
        }
        public async Task SendPasswordRecoveryEmail(User user, string token)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Viknowledge", email));
            message.To.Add(MailboxAddress.Parse(user.Email));
            message.Subject = "Password recovery";

            var body = new TextPart("html");
            body.Text = @$"
                <h1>Viknowledge</h1>
                With the following token you can change your password, if you didn't ask for it, please leave this message unattended.
                <b>{token}</b>
            ";
            message.Body = body;
            await SendEmailAsync(message);
        }

        protected async Task SendEmailAsync(MimeMessage mimeMessage)
        {
            using(var client = new SmtpClient())
            {
                await client.ConnectAsync(serverAddress, serverPort, MailKit.Security.SecureSocketOptions.StartTlsWhenAvailable);
                await client.AuthenticateAsync(username, password);
                await client.SendAsync(mimeMessage);
                await client.DisconnectAsync(true);
            }
        }


    }
}
