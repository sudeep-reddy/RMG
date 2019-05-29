using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RMG.Models
{
    public class CustomerContext
    {
            public string ConnectionString { get; set; }

            public CustomerContext(string connectionString)
            {
                this.ConnectionString = connectionString;
            }

            private MySqlConnection GetConnection()
            {
                return new MySqlConnection(ConnectionString);
            }

            public List<Customer> GetAllCustomer()
            {
                List<Customer> list = new List<Customer>();

                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AllCustomers", conn);
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            list.Add(new Customer()
                            {
                                cust_id = reader["cust_id"].ToString(),
                                cust_code = reader["cust_code"].ToString(),
                                cust_name = reader["cust_name"].ToString(),
                                location_id = reader["location_id"].ToString(),
                                Project_Name = reader["Project_Name"].ToString(),
                            });
                        }
                    }
                }
                return list;
            }

            public void AddCustomer(Customer customer)
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_AddCustomer", conn);

                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("cust_id", customer.cust_id);
                    cmd.Parameters.AddWithValue("cust_code", customer.cust_code);
                    cmd.Parameters.AddWithValue("cust_name", customer.cust_name);
                    cmd.Parameters.AddWithValue("location_id", customer.location_id);
                    cmd.Parameters.AddWithValue("Project_Name", customer.Project_Name);



                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }

            public Customer GetCustomerData(string cust_id)

            {
                Customer customer = new Customer();
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("select cust_id,cust_code,cust_name,location_id,Project_Name from pact_rmg_customer_mst WHERE cust_id=" + cust_id, conn);



                    conn.Open();
                    using (var rdr = cmd.ExecuteReader())
                    {

                        while (rdr.Read())

                        {

                            customer.cust_id = rdr["cust_id"].ToString();

                            customer.cust_code = rdr["cust_code"].ToString();

                            customer.cust_name = rdr["cust_name"].ToString();

                            customer.location_id = rdr["location_id"].ToString();

                            customer.Project_Name = rdr["Project_Name"].ToString();


                        }

                    }

                    return customer;
                }

            }
            public void DeleteCustomer(string cust_id)
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_DeleteCustomer", conn);

                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("pcust_id", cust_id);


                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }
            public void UpdateCustomer(Customer customer)
            {
                using (MySqlConnection conn = GetConnection())
                {
                    conn.Open();
                    MySqlCommand cmd = new MySqlCommand("sp_UpdateCustomer", conn);

                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("pcust_id", customer.cust_id);
                    cmd.Parameters.AddWithValue("cust_code", customer.cust_code);
                    cmd.Parameters.AddWithValue("cust_name", customer.cust_name);
                    cmd.Parameters.AddWithValue("location_id", customer.location_id);
                    cmd.Parameters.AddWithValue("Project_Name", customer.Project_Name);



                    cmd.ExecuteNonQuery();
                    conn.Close();
                }

            }
    }
}
