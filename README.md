
To get accounts by name

localhost:3000/v1/accounts/name

To create an email account

localhost:3000/v1/accounts

```
{
    "name":"Vaibhav Namburi",
    "email": "vnamburi@smartleadscale.org",
    "username": "vnamburi@smartleadscale.org",
    "password": "sg#2cxEi3Jo@ZX2f!4",
    "smtpHost": "smtp.zoho.com.au",
    "smtpPort": 4000,
    "messagePerDay": 200,
    "smtpSecurity": "SSL",
    "minimumTimeGap": 100,
    "differnetReplyAddress": false,
    "imapHost": "imap.zoho.com.au",
    "imapPort": 4002,
    "imapSecurity": "SSL"
}
```

To sent the eamil
localhost:3000/v1/sent-mail



```
{
    "to":"emailaddress@gmail.com",
    "cc":"emailaddress@gmail.com",
    "subject": "This is a test email",
    "body": "This is the body of the test email"
}
```