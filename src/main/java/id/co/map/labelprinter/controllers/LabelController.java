package id.co.map.labelprinter.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
class LabelController {

    @GetMapping("/labels")
    public ModelAndView viewLabels(ModelAndView m){

        return m;
    }



}
