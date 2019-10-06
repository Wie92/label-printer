package id.co.map.labelprinter.controllers;

import id.co.map.labelprinter.services.Html2PdfService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
class PdfService {

    private final Html2PdfService documentGeneratorService;

    public PdfService(Html2PdfService documentGeneratorService) {
        this.documentGeneratorService = documentGeneratorService;
    }

    @RequestMapping(value = "/html2pdf", method = RequestMethod.POST, produces = "application/pdf")
    public ResponseEntity html2pdf(@RequestBody Map<String, Object> data) {
        InputStreamResource resource = documentGeneratorService.html2PdfGenerator(data);
        if (resource != null) {
            return ResponseEntity
                    .ok()
                    .body(resource);
        } else {
            return new ResponseEntity(HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

}
