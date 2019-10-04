package id.co.map.labelprinter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Awie on 10/4/2019
 */
@Controller
class IndexController {

    @GetMapping({"", "/", "/index", "/index.html"})
    public String showIndex(){
        return "index";
    }

}
