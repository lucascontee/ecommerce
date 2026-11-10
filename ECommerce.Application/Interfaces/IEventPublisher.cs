using System.Threading.Tasks;

namespace ECommerce.Application.Interfaces;

public interface IEventPublisher
{
    Task PublishOrderMessage(object orderEvent);
}
