# ---------------------------------------------------
# FASE 1: BUILD (Pesada - Usando o SDK)
# ---------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia apenas o arquivo de projeto primeiro e restaura os pacotes (Cache otimizado)
COPY ["ECommerce.Api/ECommerce.Api.csproj", "ECommerce.Api/"]
# Se você tiver outros projetos (Domain, Infrastructure), adicione os COPYs deles aqui
RUN dotnet restore "ECommerce.Api/ECommerce.Api.csproj"

# Copia todo o resto do código-fonte
COPY . .
WORKDIR "/src/ECommerce.Api"

# Compila e publica o projeto em uma pasta chamada /app/publish
RUN dotnet publish "ECommerce.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ---------------------------------------------------
# FASE 2: RUNTIME (Leve - Usando a versão Alpine)
# ---------------------------------------------------
# A versão Alpine Linux é minúscula e focada em segurança
FROM mcr.microsoft.com/dotnet/aspnet:10.0-azurelinux3.0-distroless AS final
WORKDIR /app
EXPOSE 8080

# 1. A Mágica: Copia APENAS as DLLs finais geradas na Fase 1
COPY --from=build /app/publish .

USER $APP_UID

# 2. Roda a API
ENTRYPOINT ["dotnet", "ECommerce.Api.dll"]