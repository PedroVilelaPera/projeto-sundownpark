window.addEventListener("load", main)

async function acessarCalendario() {
        const res = await fetch("/api/calendario")
        const dado = await res.json()
        console.log(dado)
        return dado;
}

const diasDaSemana = ["domingo","segunda","terça","quarta","quinta","sexta","sabado"]

async function main() {
    
    const objCalendario = await acessarCalendario()
    const calendario = document.getElementById("calendario")

    // Adiciona os Anos

    for (const ano in objCalendario) {

        const anoD = document.createElement("div")
        anoD.classList = "calendarioAno"

        const anoP = document.createElement("p")
        anoP.classList = "anoP"
        anoP.textContent = ano.split("").join(" ")

        const mesesD = document.createElement("div")
        mesesD.classList = "calendarioMeses"

        anoD.appendChild(anoP)
        calendario.appendChild(anoD)

        // Adiciona o Aviso de Reabertura

        if (calendario.children.length === 2 && anoD.children.length === 1) {

            const primeiroAno = Object.keys(objCalendario)[0]
            const primeiroMes = Object.keys(objCalendario[primeiroAno])[0]
            const primeiroDia = objCalendario[primeiroAno][primeiroMes].diasAbertos[0]

            const criarP = (id, texto) => {
                const p = document.createElement("p")
                p.id = id
                p.textContent = texto
                return p
            }

            const avisoD = document.createElement("div")
            avisoD.id = "calendarioAviso"

            const avisoP1 = criarP("avisoP1", "TEMPORADA ENCERRADA!")
            const avisoP2 = criarP("avisoP2", "Voltamos em")
            const avisoP3 = criarP(
                "avisoP3",
                (primeiroDia < 10 ? "0" + primeiroDia : primeiroDia) + " de " + primeiroMes
            )

            const avisoP4D = document.createElement("div")
            avisoP4D.id = "avisoP4"

            const avisoP4D1 = document.createElement("p")
            avisoP4D1.classList = "avisoP"
            avisoP4D1.textContent = objCalendario[primeiroAno][primeiroMes].diaDaSemanaQueComeca

            const avisoP4D2 = document.createElement("p")
            avisoP4D2.classList = "avisoP"
            avisoP4D2.textContent = primeiroAno

            avisoP4D.append(avisoP4D1, avisoP4D2)

            avisoD.append(avisoP1, avisoP2, avisoP3, avisoP4D)
            mesesD.appendChild(avisoD)
        }

        // Adiciona os Meses

        for (const mes in objCalendario[ano]) {

            const mesD = document.createElement("div")
            mesD.classList = "calendarioMes"

            const mesP = document.createElement("p")
            mesP.classList = "mesP"
            mesP.textContent = mes.toUpperCase()

            const diasD = document.createElement("div")
            diasD.classList = "calendarioDias"
            
            // Armazena as Informações do Mês

            const totalDeDias = objCalendario[ano][mes].totalDeDias
            const diaDaSemanaQueComeca = objCalendario[ano][mes].diaDaSemanaQueComeca
            const diasAbertos = objCalendario[ano][mes].diasAbertos
            const diasAConfirmarAbertura = objCalendario[ano][mes].diasAConfirmarAbertura
            const datasEspeciais = objCalendario[ano][mes].datasEspeciais

            // Adiciona os Dias na Semana nos Meses

            const diasDaSemanaD = document.createElement("div")   
            diasDaSemanaD.classList = "diasDaSemana"
            
            for (let i = 0; i < diasDaSemana.length; i++) {
                
                const diaDaSemanaP = document.createElement("p")
                diaDaSemanaP.classList = "calendarioDia"

                diaDaSemanaP.textContent = diasDaSemana[i][0].toUpperCase()

                diasDaSemanaD.appendChild(diaDaSemanaP)
            }

            diasD.appendChild(diasDaSemanaD)

            // Adiciona Espaços Vazios no Calendario

            for (const diaDaSemana of diasDaSemana) {

                if (diaDaSemana === diaDaSemanaQueComeca){ break }

                const espacoVazioP = document.createElement("p")
                espacoVazioP.classList = "calendarioDia"
                espacoVazioP.textContent = ""
                diasD.appendChild(espacoVazioP)
            }

            // Adiciona os Dias dos Mês

            for (let dia = 1; dia < totalDeDias+1; dia++) {

                const diaP = document.createElement("p")
                diaP.classList = "calendarioDia"

                if (diasAbertos.includes(dia)) { diaP.classList.add("aberto") }

                if (diasAConfirmarAbertura.includes(dia)) { diaP.classList.add("aConfirmar") }

                diaP.textContent = dia
                diasD.appendChild(diaP)
            }

            // Adiciona Mensagens de Datas Especiais

            const datasEspeciaisD = document.createElement("div")
            datasEspeciaisD.classList = "calendarioDatasEspeciais"

            if (Object.keys(objCalendario)[0] === ano && Object.keys(objCalendario[Object.keys(objCalendario)[0]])[0] === mes) {

                const dataEspecialP = document.createElement("p")
                dataEspecialP.classList = "calendarioAvisoDeTemporada"

                dataEspecialP.textContent = (diasAbertos[0] < 10 ? "0" + diasAbertos[0] : diasAbertos[0]) + " - Abertura da nova temporada"

                datasEspeciaisD.appendChild(dataEspecialP)
            }

            for (const dataEspecial of datasEspeciais) {
                
                const dataEspecialP = document.createElement("p")

                dataEspecialP.textContent = dataEspecial

                datasEspeciaisD.appendChild(dataEspecialP)
            }

            if (Object.keys(objCalendario)[Object.keys(objCalendario).length - 1] === ano && Object.keys(objCalendario[Object.keys(objCalendario)[Object.keys(objCalendario).length - 1]])[Object.keys(objCalendario[Object.keys(objCalendario)[Object.keys(objCalendario).length - 1]]).length - 1] === mes) {

                const dataEspecialP = document.createElement("p")
                dataEspecialP.classList = "calendarioAvisoDeTemporada"

                let ultimoDia = diasAbertos[diasAbertos.length - 1]
                if (ultimoDia > diasAConfirmarAbertura[diasAbertos.length - 1]) {
                    ultimoDia = diasAConfirmarAbertura[diasAbertos.length - 1]
                }
                dataEspecialP.textContent = (ultimoDia < 10 ? "0" + ultimoDia : ultimoDia) + " - Encerramento de temporada"

                datasEspeciaisD.appendChild(dataEspecialP)
            }

            // Adiciona os Meses ao Ano

            mesD.appendChild(mesP)
            mesD.appendChild(diasD)
            mesD.appendChild(datasEspeciaisD)
            mesesD.appendChild(mesD)
            anoD.appendChild(mesesD)
        } 
    }
}