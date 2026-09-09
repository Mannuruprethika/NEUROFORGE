package com.neuroforge.service;

import com.neuroforge.entity.Role;
import com.neuroforge.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    // GET all roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // GET role by ID
    public Optional<Role> getRoleById(String id) {
        return roleRepository.findById(id);
    }

    // POST - create role
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    // PUT - update role
    public Optional<Role> updateRole(String id, Role roleDetails) {
        return roleRepository.findById(id).map(role -> {

            role.setName(roleDetails.getName());
            role.setPermissions(roleDetails.getPermissions());

            return roleRepository.save(role);
        });
    }

    // DELETE - delete role
    public boolean deleteRole(String id) {

        if (roleRepository.existsById(id)) {
            roleRepository.deleteById(id);
            return true;
        }

        return false;
    }
}