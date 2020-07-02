package aspect;

import java.util.concurrent.TimeUnit;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class LoggerAspect {
	  @Pointcut("execution(* api.RestJPA.*.*(..))")
	  private void restJPAQueries() {
	  }
	  
	  @Before("restJPAQueries()")
	  public void logBefore1(JoinPoint joinPoint)  {
		  System.out.println("*** Wykonanie metody " + joinPoint.getSignature().getName() + "...");
	  }
	  
	  @AfterReturning(pointcut = "restJPAQueries()", returning = "retVal")
	  public void afterReturningMethod1(JoinPoint joinPoint, Object retVal) {
	      System.out.println("*** Metoda " + joinPoint.getSignature().getName() + " zwróciła wartość : " + retVal.toString());
	  }
  
	  @Around("restJPAQueries()")
	  public Object measureMethodExecutionTime(ProceedingJoinPoint pjp) throws Throwable {
	      long start = System.nanoTime();
	      Object retval = pjp.proceed();
	      long end = System.nanoTime();
	      System.out.print("*** Czas wykonania " + pjp.getSignature().getName() + " wynosi " + 
	             TimeUnit.NANOSECONDS.toMillis(end - start) + " ms");
	      return retval;
	  }
}