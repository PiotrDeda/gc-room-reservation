package gc.roomreservation.auth.api;

import lombok.Value;

import java.util.List;

@Value
public class JwtResponse
{
	String token;
	String type = "Bearer";
	long id;
	String username;
	List<String> roles;
}
