package gc.roomreservation.auth.api;

import lombok.Value;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class RegisterRequest
{
	String username;
	String password;
}
