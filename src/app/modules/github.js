const TOKEN = process.env.GITHUB_TOKEN_ID;
const query = `
query($username:String!) { 
    user(login: $username){
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function retrieveContributionData(username) {
  const variables = `
    {
      "username": "${username}"
    }
  `;
  const body = {
    query,
    variables,
  };
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}
