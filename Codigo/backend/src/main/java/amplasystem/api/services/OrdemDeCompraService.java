package amplasystem.api.services;

import amplasystem.api.dtos.OrderFilterDto;
import amplasystem.api.enuns.StatusOrder;
import amplasystem.api.exceptions.ObjectNotFoundException;
import amplasystem.api.models.Cliente;
import amplasystem.api.models.Industria;
import amplasystem.api.models.OrdemDeCompra;
import amplasystem.api.repositories.OrdemDeCompraRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ValidationException;
import jakarta.validation.Validator;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Transactional
@Service
@Log4j2
public class OrdemDeCompraService {
    @Autowired
    private OrdemDeCompraRepository ordemDeCompraRepository;

    @Autowired
    private ClienteService clienteService;
    @Autowired IndustriaService industriaService;
    @Autowired
    private Validator validator;

    public List<OrdemDeCompra> getAllOrdemDeCompras() {
        return ordemDeCompraRepository.findAll().stream().toList();
    }

    public OrdemDeCompra getOrdemDeCompraById(Integer id) throws NoSuchElementException {
        Optional<OrdemDeCompra> ordemDeCompra = ordemDeCompraRepository.findById(id);
        if (ordemDeCompra.isEmpty()) {
            throw new NoSuchElementException("Ordem de compra não encontrada na base de dados");
        }

        return ordemDeCompra.get();
    }

    public OrdemDeCompra save(OrdemDeCompra ordemDeCompra) {
        log.info(ordemDeCompra);
        Set<ConstraintViolation<OrdemDeCompra>> violations = validator.validate(ordemDeCompra);
        if (!violations.isEmpty()) {
            throw new ValidationException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }

        if (ordemDeCompraRepository.existsBycodigoPedido(ordemDeCompra.getCodigoPedido())) {
            throw new IllegalStateException("Já existe uma ordem de compra  cadastrada com o mesmo numero.");
        }
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        ordemDeCompra.setDataCadastro(date.format(formatter));
        return ordemDeCompraRepository.save(ordemDeCompra);
    }

    public void delete(Integer id) {
        ordemDeCompraRepository.deleteById(id);
    }

    public void update(OrdemDeCompra ordemDeCompra) {
        if (ordemDeCompraRepository.existsById(ordemDeCompra.getId())) {
            ordemDeCompraRepository.save(ordemDeCompra);
        } else {
            throw new ObjectNotFoundException("Ordem de compra não encontrada na base de dados");
        }
    }

    public boolean checkIfOrderNotExist(OrdemDeCompra order) {
        OrdemDeCompra aux = getOrdemDeCompraById(order.getId());
        return aux == null;
    }

    public List<OrdemDeCompra> getAllOrdemDeComprasByIndustriaIdAndClient(OrderFilterDto param) {
        Cliente cliente = clienteService.getById(param.clienteId());
        Industria industria = industriaService.getById(param.industriaId());
        return ordemDeCompraRepository.findAllByClienteAndIndustriaAndTotalmenteFaturadoIsNot(cliente, industria,StatusOrder.TOTALMENTEFATURADO);

    }

    public List<OrdemDeCompra> getAllOrdemDeComprasByClientaId(Integer clienteId) {
        Cliente cliente = clienteService.getById(clienteId);
        return ordemDeCompraRepository.findAllByClienteAndTotalmenteFaturadoIsNot(cliente,StatusOrder.TOTALMENTEFATURADO);
    }

    public List<OrdemDeCompra> getAllOrdemDeComprasByIndustriaId(Integer industriaId) {
        Industria industria = industriaService.getById(industriaId);
        return ordemDeCompraRepository.findAllByIndustriaAndTotalmenteFaturadoIsNot(industria,StatusOrder.TOTALMENTEFATURADO);
    }
    public List<OrdemDeCompra> getAllOrdemDeComprasWithWasNotFullPayment() {
        return ordemDeCompraRepository.findAllByTotalmenteFaturadoIsNot(StatusOrder.TOTALMENTEFATURADO);

    }
}
