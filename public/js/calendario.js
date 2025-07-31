window.addEventListener("load", main)

let calendario = {
    "2 0 2 5" : {
        "Setembro" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "segunda",
            "diasAbertos" : [6,7,13,14,20,21,27,28], 
            "diasAConfirmarAbertura" : []
        },
        "Outubro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "quarta",
            "diasAbertos" : [4,5,10,11,12,17,18,19,25,26], 
            "diasAConfirmarAbertura" : []
        },
        "Novembro" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "sabado",
            "diasAbertos" : [1,2,8,9,14,15,16,20,21,22,23,29,30], 
            "diasAConfirmarAbertura" : []
        },
        "Dezembro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "segunda",
            "diasAbertos" : [6,7,12,13,14,20,21,25,26,27,28], 
            "diasAConfirmarAbertura" : []
        }
    },
    "2 0 2 6" : {
        "Janeiro" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "quinta",
            "diasAbertos" : [1,2,3,4,9,10,11,16,17,18,23,24,25,30,31], 
            "diasAConfirmarAbertura" : [8]
        },
        "Fevereiro" : {
            "totalDeDias" : 28,
            "diaDaSemanaQueComeca" : "domingo",
            "diasAbertos" : [1,7,8,14,15,16,17,21,22,28], 
            "diasAConfirmarAbertura" : []
        },
        "Março" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "domingo",
            "diasAbertos" : [1,7,8,14,15,21,22,28,29], 
            "diasAConfirmarAbertura" : []
        },
        "Abril" : {
            "totalDeDias" : 30,
            "diaDaSemanaQueComeca" : "quarta",
            "diasAbertos" : [5,12,19,21,26], 
            "diasAConfirmarAbertura" : [4,11,18,25]
        },
        "Maio" : {
            "totalDeDias" : 31,
            "diaDaSemanaQueComeca" : "sexta",
            "diasAbertos" : [1,3], 
            "diasAConfirmarAbertura" : [2]
        }
    } 
}

let diasDaSemana = ["domingo","segunda","terça","quarta","quinta","sexta","sabado"]

function main() {
    
    const divCalendario = document.getElementById("calendario")
    let primeiroElemento = true

    for (const i in calendario) {

        const anoD = document.createElement("div")
        const anoP = document.createElement("p")
        const dMeses = document.createElement("div")

        anoD.appendChild(anoP)
        divCalendario.appendChild(anoD)

        if (primeiroElemento) {
            const dAviso = document.createElement("div")
            const pAviso = document.createElement("p")
            dAviso.classList = "calendarioAviso"
            pAviso.textContent = "texto"
            dAviso.appendChild(pAviso)
            dMeses.appendChild(dAviso)
            primeiroElemento = false
        }

        anoD.classList = "calendarioAno"
        dMeses.classList = "calendarioMeses"
        anoP.classList = "anoP"
        anoP.textContent = i

        for (const j in calendario[i]) {
            const dMes = document.createElement("div")
            const dDias = document.createElement("div")
            const mes = document.createElement("p")

            dMes.classList = "calendarioMes"
            dDias.classList = "calendarioDias"
            mes.classList = "mesP"
            mes.textContent = j.toUpperCase()
            
            const totalDeDias = calendario[i][j].totalDeDias
            const diaDaSemanaQueComeca = calendario[i][j].diaDaSemanaQueComeca
            const diasAbertos = calendario[i][j].diasAbertos
            const diasAConfirmarAbertura = calendario[i][j].diasAConfirmarAbertura

            const diasDaSemanaDiv = document.createElement("div")   
            diasDaSemanaDiv.classList = "diasDaSemana"

            for (const s in ["D","S","T","Q","Q","S","S"]) {
                
                const vazio = document.createElement("p")

                
                vazio.classList = "calendarioDia"
                vazio.textContent = ["D","S","T","Q","Q","S","S"][s]

                diasDaSemanaDiv.appendChild(vazio)
                
            }

            dDias.appendChild(diasDaSemanaDiv)

            for (const k in diasDaSemana) {
                if (diasDaSemana[k] === diaDaSemanaQueComeca){
                    break
                }
                const vazio = document.createElement("p")
                vazio.classList = "calendarioDia"
                vazio.textContent = ""
                dDias.appendChild(vazio)
            }

            for (let h = 1; h < totalDeDias+1; h++) {
                const dia = document.createElement("p")
                dia.classList = "calendarioDia"
                if (diasAbertos.includes(h)) {
                    dia.classList.add("aberto")
                }
                if (diasAConfirmarAbertura.includes(h)) {
                    dia.classList.add("aConfirmar")
                }
                dia.textContent = h
                dDias.appendChild(dia)
            }

            dMes.appendChild(mes)
            dMes.appendChild(dDias)
            dMeses.appendChild(dMes)
            anoD.appendChild(dMeses)
        } 
    }
}