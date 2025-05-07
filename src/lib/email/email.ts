export const baseEmailStyles = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #f9fafb;
    padding: 0;
    margin: 0;
  }
  .container {
    max-width: 600px;
    margin: 40px auto;
    padding: 24px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  }
  h1 {
    font-size: 22px;
    color: #111827;
    margin-bottom: 16px;
  }
  p {
    font-size: 16px;
    color: #374151;
  }
  .cta {
      background-color: #f6f8fa;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  color: #24292f !important;
  text-decoration: none;
  display: inline-block;
  }
  .footer {
    margin-top: 40px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
  }
`;

export function followerNotificationEmail({
  recipientEmail,
  githubUsername,
  newFollowers,
  totalFollowers,
}: {
  recipientEmail: string;
  githubUsername: string;
  newFollowers: { username: string; avatarUrl: string }[];
  totalFollowers?: number;
}) {
  const followerListHtml = newFollowers
    .map(
      (follower) => `
      <div class="follower-box">
        <img class="follower-avatar" src="${follower.avatarUrl}" alt="${follower.username}'s avatar" />
        <div>
          <p style="margin: 0;"><a href="https://github.com/${follower.username}">${follower.username}</a></p>
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
    <title>New GitHub Followers</title>
    <style>
      ${baseEmailStyles}
        .follower-box {
    display: flex;
    align-items: center;
    margin-top: 16px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
  }
  .follower-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 16px;
  }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>🎉 You have ${newFollowers.length} new follower${newFollowers.length > 1 ? "s" : ""}!</h1>
      <p>
        The following GitHub user${newFollowers.length > 1 ? "s have" : " has"} recently followed <strong>${githubUsername}</strong>.
        ${totalFollowers ? `<br>Total followers: <strong>${totalFollowers}</strong>` : ''}
      </p>

      ${followerListHtml}

      <a class="cta" href="https://github.com/${githubUsername}?tab=followers">View all followers</a>

      <div class="footer">
        Sent to ${recipientEmail} • <a href="https://ghnotify.com/unsubscribe">Unsubscribe</a>
      </div>
    </div>
  </body>
</html>`.trim();
}

export function subscriptionConfirmation({
  username,
  emailFrequency,
}: {
  username: string;
  emailFrequency: string;
}) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>
      Subscription Confirmation
    </title>
    <style>
      ${baseEmailStyles}
    </style>
  </head>
  <body>
    <div class="container">
      <h1>You're subscribed!</h1>
      <p>
        You've successfully subscribed to follwoers updates for <strong>${username}</strong>.
      </p>
      <p>
        You'll receive email notifications <strong>${emailFrequency}</strong> when they get new followers.
      </p>
      <a class="cta" href="https://github.com/${username}?tab=followers">
        View ${username}'s followers
      </a>
      <div class="footer">
        <a href="https://ghnotify.com/unsubscribe">Unsubscribe</a> at any time
      </div>
    </div>
  </body>
</html>`.trim();
}
