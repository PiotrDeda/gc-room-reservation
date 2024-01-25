package gc.roomreservation.auth.api;

import lombok.Value;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class LoginRequest
{
	String username;
	String password;
}
