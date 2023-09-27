SELECT concat(upper(employeeName), ' is the name') AS SpecificEmployeeName
FROM employees
WHERE salary > 0
ORDER BY employeeName DESC;
SELECT *
FROM employees;