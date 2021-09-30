class game
{
    row:number
    col:number
    runs:number
    t_id:string
    player_runs:Array<number>
    overall:Array<number>
    tr:HTMLElement
    td:HTMLElement
    th:HTMLElement
    team_num:number
     btn:HTMLElement
     team_score:HTMLElement
     sum:number
     h_btn:string
     
   constructor(t_id,team_num,h_btn)
    {
    this.row=2
    this.col=2
    this.t_id=t_id
    this.team_num=team_num
    this.player_runs=[]
    this.Table()
    this.sum=0
    this.h_btn=h_btn

        //document.getElementById(this.h_btn).setAttribute("disabled","disabled");
       document.getElementById(this.h_btn).addEventListener("click",this.Hit());
    
    }
    Table() {
        let t=document.getElementById(this.t_id);
        for(let row=1;row<=11;row++)
        {
        this.tr=document.createElement("tr");
        for(let i=1;i<=8;i++)
        {
            if(row==1)
            {
                this.th=document.createElement("th");
                if(i==1)
              {

                  this.th.innerHTML="TEAM"+this.team_num;
              }
              else if(i!=8)
              {
                this.th.innerHTML="B"+(i-1);
              }
              else{
                this.th.innerHTML="TOTAL"; 
              }
              this.tr.appendChild(this.th);
            }   

            else
            {  
            this.td=document.createElement("td");
              if(i==1)
              {
                  this.td.innerHTML="PLAYER"+(row-1);
              }
              else
              {
                this.td.innerHTML=" ";
                this.td.setAttribute("id",this.team_num.toString()+row.toString()+i.toString());
              }
              this.tr.appendChild(this.td);
            }
            t.appendChild(this.tr)   
        }
       }
    }
    
    Hit():() => void{
        return () => {
                   this.td=document.getElementById(this.team_num.toString()+this.row.toString()+this.col.toString());
                   let runs=Math.floor(Math.random()*6);
                   this.td.innerHTML=runs.toString();
                   console.log(this.row,this.col)
                   if(this.col<=7 && runs!=0)
                   {
                       this.col=this.col+1;
                       this.player_runs.push(runs)
                       let s=this.Sum(this.row)
                        this.sum=this.sum+runs;
                        document.getElementById("total"+this.team_num.toString()).innerText=""+this.sum;
                   }
                   else 
                   {
                       let s=this.Sum(this.row)
                       this.row=this.row+1;
                       this.col=2;
                       this.player_runs=[];
                       document.getElementById("total"+this.team_num.toString()).innerText=""+this.sum;
                    }  
                    if(this.row==12)
                    {
                        document.getElementById(this.h_btn).setAttribute("disabled","disabled");

                    }            
            }
        }
        Sum(row:number)//total score a player
        {
            let c=8;
            let s=this.player_runs.reduce((a,b)=>a+b,0)
            document.getElementById(this.team_num.toString()+row.toString()+""+8).innerHTML=""+s;
            return s;
        }     
}



class Timer
{
  start:number
  generate:HTMLElement
  team_num:number
  constructor(team_num:number)
  {
    this.team_num=team_num
    this.countdown()
      this.start=60;
      this.generate=document.getElementById("result")
      this.generate.addEventListener("click",this.generate_results())

  }
  countdown()
  {
  let temp=0;
        for(let i=60;i>=0;i--)
        {
            setTimeout(function(){
               let  timer=document.getElementById("timer")
                timer.innerHTML=""+i
                this.start=this.start-1
                
            },1000*temp)
            temp=temp+1
        }
  }
generate_results():  ()=>void{
    return ()=>{
        let s1=parseInt(document.getElementById("total1").innerHTML)
        let s2=parseInt(document.getElementById("total2").innerHTML)
        let winner_team=0
        if(s1==s2)
        {
            document.getElementById("win").innerHTML=" Match Draw"
            document.getElementById("man").innerHTML="None"
        }
        else
        {
            if(s1>s2)
            {
                document.getElementById("win").innerHTML="Team 1 won the match"
                winner_team=1
            }
            else
            {
                document.getElementById("win").innerHTML="Team 2 won the match"
                winner_team=2
            }
            this.manofthematch(winner_team)
        }
    }
}
manofthematch(team:number)
{
    let sum1=[]
    for(let i=2;i<=11;i++)
    {
      let c=8;
        sum1.push(document.getElementById(team+""+i+c.toString()).innerText)
    }
    let m=Math.max(...sum1)
    console.log(m+"Highest runs")
    document.getElementById("man").innerHTML="Team"+team+"<br>player"+(sum1.indexOf(""+m)+1)+"</i>"
}
}





new game("t1",1,"hit1")
setTimeout(()=>{
  new Timer(1);
},2*1000)

setTimeout(() => {
  document.getElementById("hit1").setAttribute("disabled","disabled");
  document.getElementById("team").innerHTML="Team 2 Start the game"
  document.getElementById("timer").innerHTML=" "
  new Timer(2)
}, 65*1000);

setTimeout(()=>{
  document.getElementById("hit2").setAttribute("disabled","disabled");
  document.getElementById("team").innerHTML="Team 2 Stop the game<br> <b>To view the results click Generate results<b>"
  document.getElementById("timer").innerHTML=" "
},125*1000)

new game("t2",2,"hit2")
