import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
  ],

  callbacks: {
    /*  async session({ session, token, user }) {
      console.log('session#2', token, user, session);

      // Send properties to the client, like an access_token from a provider.
      return { ...session, accessToken: token.accessToken };
    }, */
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account?.access_token;
      }

      return token;
    },
    async session({ session, token }) {
      return { ...session, accessToken: token.accessToken };
    },
  },
};

export default NextAuth(authOptions);
