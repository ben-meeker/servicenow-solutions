# Custom List Only Showing for Admin in Workspace

### List Applicability

### Creator: [@ben-meeker](https://github.com/ben-meeker)

When creating custom lists on a workspace, in some cases, these lists are only visible to admins. This solution shows how you can fix this by giving an audience access to view the list.
  
### Create a list applicability

Navigate to the table `sys_ux_applicability_m2m_list` or go to `https://<your instance name>.service-now.com/now/nav/ui/classic/params/target/sys_ux_applicability_m2m_list_list.do%3Fsysparm_clear_stack%3Dtrue`

Create a new List Applicability record on the table, with your list and applicability. The applicability is your audience.

Sometimes lists have the same name as many others, for example: `All` is very common. If this is the case, click the search button when entering your list name, and filter by `Sys ID`.