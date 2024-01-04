package gc.roomreservation.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtils
{
	protected final Log logger = LogFactory.getLog(getClass());

	@Value("${gc.app.jwt-secret-key}")
	private String jwtSecretKey;

	@Value("${gc.app.jwt-expiration-ms}")
	private int jwtExpirationMs;

	public String generateJwtToken(Authentication authentication)
	{
		return Jwts.builder()
				.subject((((UserDetailsImpl) authentication.getPrincipal()).getUsername()))
				.issuedAt(new Date())
				.expiration(new Date((new Date()).getTime() + jwtExpirationMs))
				.signWith(key())
				.compact();
	}

	private SecretKey key()
	{
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecretKey));
	}

	public String getUserNameFromJwtToken(String token)
	{
		return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token).getPayload().getSubject();
	}

	public boolean validateJwtToken(String authToken)
	{
		try
		{
			Jwts.parser().verifyWith(key()).build().parse(authToken);
			return true;
		}
		catch (MalformedJwtException e)
		{
			logger.error("Invalid JWT token: {}", e);
		}
		catch (ExpiredJwtException e)
		{
			logger.error("JWT token is expired: {}", e);
		}
		catch (UnsupportedJwtException e)
		{
			logger.error("JWT token is unsupported: {}", e);
		}
		catch (IllegalArgumentException e)
		{
			logger.error("JWT claims string is empty: {}", e);
		}
		return false;
	}
}
