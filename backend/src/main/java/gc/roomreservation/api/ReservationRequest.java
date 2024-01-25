package gc.roomreservation.api;

import lombok.Value;

import java.time.LocalDateTime;

@Value
@SuppressWarnings("ClassCanBeRecord")
public class ReservationRequest
{
	String roomName;
	LocalDateTime startTime;
	LocalDateTime endTime;
}
