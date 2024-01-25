package gc.roomreservation.auth.api;

import lombok.Value;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class ProfileResponse
{
	long userId;
	String username;
	String role;
}
