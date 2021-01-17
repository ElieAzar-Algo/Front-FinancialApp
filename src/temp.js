 getExpensesAndIncomeData(){
         return this.getData(this.INCOME).then(
           expensesData=>{
           this.getData(this.EXPENSE).then(incomesData=>{
            
             let list = [... expensesData.list,... incomesData.list];
             
             return  list;

          });
         })

   
    }

     getData(incomeExpense) {
        let firstYear = 2010;
        const date = new Date();
        let lastYear = date.getFullYear();

        let from =  `${firstYear}-1-1`;
        let to = `${lastYear}-12-31`;

        //TODO the token should be provided by a context
        let token = localStorage.getItem("token");
        console.log("toke",token);
        
        return fetch(`http://127.0.0.1:8000/api/report/${incomeExpense}?startdate=${from}&enddate=${to}`, {
            "headers": {
              "Authorization": "Bearer " + token,
              "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:84.0) Gecko/20100101 Firefox/84.0",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.5",
              "Upgrade-Insecure-Requests": "1",
              "Cache-Control": "max-age=0"
            },
            "method": "GET",
            "mode": "cors"
          }).then(
            res =>{
              return res.json();
            }
          )
          .then(
            data =>{
              if(incomeExpense == this.INCOME) return {
                list: [... data.recurring_incomes,...  data.fixed_incomes],
                  sum :  data.total_sum
              };
    
              return {
                list: [...  data.recurring_expenses, ...  data.fixed_expenses],
                sum :  data.total_sum
              }
            }
          ).catch(e=>{
            alert("there's an error")
            console.log(e);
          });
      }
    

       RenderItems(){
        this.getExpensesAndIncomeData().then(
          list =>{
            console.log("Render",list);
            return <p>Hello</p>
          }
        );
   /*      list.map( e =>{
           if(e.due_dates){
            let elements = [];
            for(let i = 0;i<e.due_dates.length ; iFinantial ++){
                elements.push(
                  <i><Item 
                    name={e.name}
                    description={e.description}
                    amount={e.amount}
                    category={e.category}
                    type="Reccuring"
                    date={e.due_dates[i]}
                    reccuringType={e.type}
                    />
                  </i>
                );
            }
            return {...elements}
          }  

          return                   <i><Item 
          name={e.name}
          description={e.description}
          amount={e.amount}
          category={e.category}
          type="Fixed"
          //date={e.date}
          reccuringType={e.type}
          />
        </i>
        });

        return list; */
      }
