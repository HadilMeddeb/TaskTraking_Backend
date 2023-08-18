export const emailTemplate=(subject:string,emailContent:string) =>
{
    return `

    <!DOCTYPE html>
    <html>
    <head>
      <title>Email Template</title>
      <style>
        /* Inline CSS styles */
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
          margin: 0;
          padding: 0;
        }
        
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #ffffff;
        }
        
        h1 {
          color: #333333;
        }
        
        p {
          color: #666666;
        }
        
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff9900;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to Gpro Tasker </h1>
        <p>${subject}</p>
          ${emailContent}
      </div>
    </body>
    </html>
    
    
    `
}