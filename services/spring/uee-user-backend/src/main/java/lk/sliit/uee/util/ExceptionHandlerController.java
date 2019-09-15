/**
 * 
 */
package lk.sliit.uee.util;

import static java.util.stream.Collectors.toMap;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageConversionException;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lk.sliit.uee.response.ErrorResponse;

/**
 * @author vimukthi_r
 * @Date Aug 30, 2019
 * @Description
 * @Version
 */
@RestControllerAdvice
public class ExceptionHandlerController {

	private static final String comma = ", ";

	/**
	 * This method will handle globally thrown MethodArgumentNotValid Exceptions And
	 * will return an errorResponse
	 */
	@ExceptionHandler({ MethodArgumentNotValidException.class, HttpMessageConversionException.class,
			HttpMessageNotReadableException.class })
	@ResponseBody
	@ResponseStatus(HttpStatus.OK)
	public ErrorResponse handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {

		Map<String, String> errorFieldList = new HashMap<>();
		Map<String, String> nullFieldList = null;
		ErrorResponse errorResponse = new ErrorResponse();

		errorResponse.setResponseCode("01");
		try {

			// getting format invalid errorList
			errorFieldList = ex.getBindingResult().getFieldErrors().stream()
					.filter(i -> Objects.nonNull(i.getRejectedValue()))
					.collect(toMap(FieldError::getField, FieldError::getDefaultMessage));

			// getting null errorList
			nullFieldList = ex.getBindingResult().getFieldErrors().stream()
					.filter(i -> Objects.isNull(i.getRejectedValue()))
					.collect(toMap(FieldError::getField, FieldError::getDefaultMessage));

			if (!nullFieldList.isEmpty()) {
				errorResponse.setReason(generateReason(nullFieldList));
			} else {
				errorResponse.setReason(generateReason(errorFieldList));
			}

		} catch (Exception e) {
			errorResponse.setReason(e.getMessage());
		}
		return errorResponse;
	}

	private static String generateReason(Map<String, String> list) {
		return list.entrySet().stream().map(e -> String.format("%s %s", e.getKey(), e.getValue()))
				.collect(Collectors.joining(comma));
	}

}
