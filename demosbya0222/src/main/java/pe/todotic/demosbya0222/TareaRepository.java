package pe.todotic.demosbya0222;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(path="tareas", collectionResourceRel = "tareas")
public interface TareaRepository  extends JpaRepository<Tarea, Integer> {


}
