package id.co.map.labelprinter.services;

import org.springframework.core.io.InputStreamResource;

import java.util.Map;

public interface Html2PdfService {

    InputStreamResource html2PdfGenerator(Map<String, Object> data);
}
