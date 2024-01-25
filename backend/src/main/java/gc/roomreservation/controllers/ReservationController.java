package gc.roomreservation.controllers;

import gc.roomreservation.api.ReservationRequest;
import gc.roomreservation.api.ReservationResponse;
import gc.roomreservation.auth.User;
import gc.roomreservation.auth.UserDetailsImpl;
import gc.roomreservation.auth.UserRepository;
import gc.roomreservation.model.Reservation;
import gc.roomreservation.repositories.ReservationRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

@CrossOrigin
@RestController
@RequestMapping("/reservations")
public class ReservationController
{
	private final ReservationRepository reservationRepository;
	private final UserRepository userRepository;

	public ReservationController(ReservationRepository reservationRepository, UserRepository userRepository)
	{
		this.reservationRepository = reservationRepository;
		this.userRepository = userRepository;
	}

	@GetMapping
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public List<ReservationResponse> getAllReservations()
	{
		return reservationRepository.findAll().stream().map(Reservation::mapToResponse).toList();
	}

	@GetMapping("/{id}")
	public ReservationResponse getReservationById(@PathVariable Long id)
	{
		return reservationRepository.findById(id).map(Reservation::mapToResponse).orElse(null);
	}

	@GetMapping("/user/{id}")
	public List<ReservationResponse> getReservationsByUserId(@PathVariable Long id)
	{
		return reservationRepository.findAllByUser_UserId(id).stream().map(Reservation::mapToResponse).toList();
	}

	@GetMapping("/today")
	public List<ReservationResponse> getReservationsForToday()
	{
		return reservationRepository.findAllByStartTimeBetween(LocalDate.now().atStartOfDay(),
						LocalDate.now().atTime(23, 59, 59))
				.stream().map(Reservation::mapToResponse).toList();
	}

	@PostMapping
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public ReservationResponse addReservation(@RequestBody ReservationRequest reservation)
	{
		if (reservation.getStartTime().isAfter(reservation.getEndTime()))
			throw new IllegalArgumentException("Start date must be before end date");
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		User user = userRepository.findById(userDetails.getUserId()).orElseThrow();
		return reservationRepository.save(new Reservation(user, reservation.getRoomName(), reservation.getStartTime(),
				reservation.getEndTime())).mapToResponse();
	}

	@DeleteMapping("/{id}")
	@PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
	public void deleteReservation(@PathVariable Long id)
	{
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		Reservation reservation = reservationRepository.findById(id).orElse(null);
		if (reservation != null && !Objects.equals(reservation.getUser().getUserId(), userDetails.getUserId()) &&
				authentication.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN")))
			return;
		reservationRepository.deleteById(id);
	}
}
