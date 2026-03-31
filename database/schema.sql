-- Script Oficial de Inicialização de Banco de Dados (MySQL)
-- Projeto: LandPage Data Frontier
-- Crie o banco de dados primeiro se não existir:
-- CREATE DATABASE data_frontier_db;
-- USE data_frontier_db;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) DEFAULT 'Não informado',
    message TEXT,
    subject VARCHAR(255) DEFAULT 'Não especificado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fim do Script
