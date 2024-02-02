CREATE TABLE audit_companies(
    id int not null,
    name text not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT not null
);


CREATE TABLE audit_users(
    id int not null,
    login text not null,
    password text not null,
    role text not null,
    full_name text not null,
    company_id int DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TEXT not null
);


-- insert companies

CREATE FUNCTION tf_insert_companies() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO audit_companies(id, name, status)
   VALUES (new.id, new.name, 'insert');

   return new;

END;
$$;

CREATE TRIGGER t_insert_companies 
    AFTER  insert
   ON companies
    FOR EACH ROW 
       EXECUTE PROCEDURE tf_insert_companies();



-- update companies

CREATE FUNCTION tf_update_companies() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO audit_companies(id, name, status)
   VALUES (OLD.id, OLD.name, 'update');

   return new;

END;
$$;

CREATE TRIGGER t_update_companies 
    before  update
   ON companies
    FOR EACH ROW 
       EXECUTE PROCEDURE tf_update_companies();



-- delete companies

CREATE FUNCTION tf_delete_companies() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO audit_companies(id, name, status)
   VALUES (OLD.id, OLD.name, 'delete');

   return OLD;

END;
$$;

CREATE TRIGGER t_delete_companies 
    AFTER  delete
   ON companies
    FOR EACH ROW 
       EXECUTE PROCEDURE tf_delete_companies();


-- delete users

CREATE FUNCTION tf_delete_users() 
   RETURNS TRIGGER 
   LANGUAGE PLPGSQL
AS $$
BEGIN
   INSERT INTO audit_users(id, login, password, role, full_name, company_id, status)
   VALUES (OLD.id, OLD.login, OLD.password, OLD.role, OLD.full_name, OLD.company_id, 'delete');

   return OLD;

END;
$$;

CREATE TRIGGER t_delete_users 
    AFTER  delete
   ON users
    FOR EACH ROW 
       EXECUTE PROCEDURE tf_delete_users();

