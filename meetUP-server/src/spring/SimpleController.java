package spring;
 
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
import javax.sql.DataSource;
 
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
 
@Controller(value = "saySimpleController")
@RequestMapping("/labs")
public class SimpleController {
     
    @RequestMapping("/lab01")
    public ModelAndView lab01() {
        Map<String, String> modelData = new HashMap<String, String>();
        modelData.put("msg", "Test spring!");
        return new ModelAndView("script01", modelData);
    }
     
    @RequestMapping("/lab02")
    public String lab02(@RequestParam(defaultValue="Anonim") String name, Model model) {
        //Map<String, String> modelData = new HashMap<String, String>();
         
        //modelData.put("msg", "Witaj, świecie!");
        model.addAttribute("mess","Witaj " + name + "!");
        //return new ModelAndView("script02", modelData);
        return "script02" ;
    }
     
}