using KnowledgeBase.Domain.Interfaces;
using KnowledgeBase.Domain.Models;
using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace KnowledgeBase.WebApi.ServiceHelpers
{
    public class EmailSettings{
        public string ServerAddress { get; set; }
        public int ServerPort { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public string WebAddress { get; set; }
        public bool Enabled { get; set; }
    }

    public class EmailHandler : IEmailHandler
    {
        private readonly bool enabled;
        private readonly string serverAddress;
        private readonly int serverPort;
        private readonly string username;
        private readonly string password;
        private readonly string email;
        private readonly string webAddress;
        public EmailHandler(EmailSettings emailSettings)
        {
            enabled = emailSettings.Enabled;
            serverAddress = emailSettings.ServerAddress;
            serverPort = emailSettings.ServerPort;
            username = emailSettings.Username;
            password = emailSettings.Password;
            email = emailSettings.EmailAddress;
            webAddress = emailSettings.WebAddress;
        }
        public async Task SendPasswordRecoveryEmail(User user, string token)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("Viknowledge", email));
            message.To.Add(MailboxAddress.Parse(user.Email));
            message.Subject = "Password recovery";
            var address = @$"{webAddress}?username={user.UserName}&token={token}";
            var body = new TextPart("html");
            body.Text = @$"
                <div>
                <h2>Viknowledge</h2>
                <h3>Dear {user.UserName},</h3>
                You have gotten this email because someone had requested a password reset, if this wasn't you, please ignore this mail.
                <br>
                <a style={'"'}font - size: 24; text - align: center;{'"'} href={'"'}{address}{'"'}>You can change your password by clicking at this link</a>
                <br>
                <br>
                Thanks,<br>
                <i> The Viknowledge team</i>
               </div>
                   ";
            message.Body = body;
            await SendEmailAsync(message);
        }

        protected async Task SendEmailAsync(MimeMessage mimeMessage)
        {
            if (!enabled)
                return;
            using(var client = new SmtpClient())
            {
                await client.ConnectAsync(serverAddress, serverPort, MailKit.Security.SecureSocketOptions.SslOnConnect);
                await client.AuthenticateAsync(username, password);
                await client.SendAsync(mimeMessage);
                await client.DisconnectAsync(true);
            }
        }


    }
}
