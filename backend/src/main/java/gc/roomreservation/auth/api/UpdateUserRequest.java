package gc.roomreservation.auth.api;

import lombok.Value;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class UpdateUserRequest
{
	String username;
	String password;
	String role;
}
