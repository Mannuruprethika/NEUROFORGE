package com.neuroforge.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "pipeline")
public class Pipeline {

    @Id
    @UuidGenerator
    @Column(name = "id", columnDefinition = "char(36)")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "trigger_type")
    private String triggerType;

    public Pipeline() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTriggerType() {
        return triggerType;
    }

    public void setTriggerType(String triggerType) {
        this.triggerType = triggerType;
    }
}