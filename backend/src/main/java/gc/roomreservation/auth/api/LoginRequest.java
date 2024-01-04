package gc.roomreservation.auth.api;

import lombok.Value;

@Value
public class LoginRequest
{
	String username;
	String password;
}
