package gc.roomreservation.auth.api;

import lombok.Value;

@Value
public class RegisterRequest
{
	String username;
	String password;
}
