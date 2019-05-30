using System;
using System.Collections.Generic;
using System.Text;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IContactRepository Contact { get; }
        IProjectRepository Project { get; }
    }
}
