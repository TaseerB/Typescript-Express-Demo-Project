import passport from "passport";
import { OAuth2Strategy } from "passport-google-oauth";

// Values for Client ID should be brought from env
const port = process?.env?.PORT;
const host = process?.env?.DB_HOST;
const clientID = process?.env?.CLIENTID || "test";
const clientSecret = process?.env?.CLIENTSECRET || "test";

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

console.info("--- passport ---");

passport.use(
	new OAuth2Strategy(
		{
			clientID,
			clientSecret,
			callbackURL: `http://${host}:${port}/google/callback`,
			passReqToCallback: true,
		},
		(request, accessToken, refreshToken, profile, done) => {
			return done(null, profile);
		}
	)
);

// export default passport;
