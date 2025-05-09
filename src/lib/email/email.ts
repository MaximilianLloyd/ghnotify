export const baseEmailStyles = `
  body {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    background-color: #111111 !important;
    padding: 0;
    margin: 0;
    color: #e0e0e0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    letter-spacing: -0.02em;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background-color: #111111 !important;
    border-radius: 4px;
    border: 1px solid #333333;
  }
  h1 {
    font-size: 24px;
    color: #e0e0e0;
    margin-bottom: 16px;
    font-weight: 700;
    letter-spacing: -0.03em;
  }
  p {
    font-size: 16px;
    color: #a0a0a0;
    font-weight: 500;
    letter-spacing: -0.015em;
    line-height: 1.5;
  }
  strong {
    color: #e0e0e0;
    font-weight: 700;
  }
  a {
    color: #00ff9c;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  .cta {
    background-color: #00ff9c;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    color: #0f0f0f !important;
    text-decoration: none;
    display: inline-block;
    letter-spacing: -0.015em;
  }
  .footer {
    margin-top: 40px;
    font-size: 12px;
    color: #666666;
    text-align: center;
  }
  .command-line {
    color: #00ff9c;
    font-weight: 500;
  }
  .emoji {
    margin-right: 8px;
  }
`;

export function followerNotificationEmail({
  recipientEmail,
  githubUsername,
  followers,
  totalFollowers,
}: {
  recipientEmail: string;
  githubUsername: string;
  followers: string[];
  totalFollowers?: number;
}) {
  const followerListHtml = followers
    .map(
      (follower) => `
      <div class="follower-box">
        <img class="follower-avatar" src="https://github.com/${follower}.png" alt="${follower}'s avatar" />
        <div>
          <p style="margin: 0;"><a href="https://github.com/${follower}">${follower}</a></p>
          <p style="font-size: 14px; margin: 4px 0 0; color: #6b7280;">View profile</p>
        </div>
      </div>
    `,
    )
    .join("\n");

  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>New GitHub Followers</title>
    <style>
      :root {
        color-scheme: dark;
      }
      ${baseEmailStyles}
      html, body {
        background-color: #111111 !important;
      }

        .follower-box {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding: 16px;
    border: 1px solid #333333;
    background-color: #171717;
    border-radius: 4px;
  }
  .follower-avatar {
    width: 48px;
    height: 48px;
    border-radius: 4px;
    margin-right: 16px;
  }
    </style>
  </head>
  <body style="background-color: #111111 !important;">
    <div class="container">
      <div class="command-line">$ github_notify --user=${githubUsername} --check=followers</div>
      <h1><span class="emoji">⚡</span>new follower${followers.length > 1 ? "s" : ""} detected</h1>
      <p>
        <strong>${followers.length}</strong> new user${followers.length > 1 ? "s have" : " has"} followed <strong>${githubUsername}</strong>
        ${totalFollowers ? `<br>total followers: <strong>${totalFollowers}</strong>` : ""}
      </p>

      ${followerListHtml}

      <div style="margin-top: 32px;">
      <a class="cta" href="https://github.com/${githubUsername}?tab=followers">view all followers</a>
      </div>

      <div class="footer">
        sent to ${recipientEmail} • <a href="https://ghnotify.com/unsubscribe/${recipientEmail}">unsubscribe</a>
      </div>
    </div>
  </body>
</html>`.trim();
}

export function subscriptionConfirmation({
  username,
  emailFrequency,
  email,
}: {
  username: string;
  emailFrequency: string;
  email: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>
      Subscription Confirmation
    </title>
    <style>
      :root {
        color-scheme: dark;
      }
      ${baseEmailStyles}
      html, body {
        background-color: #111111 !important;
      }

      code {
        background: #171717;
        padding: 2px 6px;
        border-radius: 4px;
        border: 1px solid #333333;
        color: #00ff9c;
        font-family: monospace;
      }
    </style>
  </head>
  <body style="background-color: #111111 !important;">
    <div class="container">
      <div class="command-line">$ github_notify --subscribe --user=${username} --frequency=${emailFrequency}</div>
      <h1><span class="emoji">✓</span>subscription activated</h1>
      <p>
        github follower tracking has been enabled for <strong>${username}</strong>
      </p>
      <p>
        notification frequency: <code>${emailFrequency}</code>
      </p>
      <div style="margin-top: 24px; margin-bottom: 12px;">
        <a class="cta" href="https://github.com/${username}?tab=followers">
          view current followers
        </a>
      </div>
      <div class="footer">
        sent to ${email} • <a href="https://ghnotify.com/unsubscribe/${email}">unsubscribe</a>
      </div>
    </div>
  </body>
</html>`.trim();
}
